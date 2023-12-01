import React, { useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { fetchNewsSuccess } from '../redux/actions/newsActions';
import axios from 'axios';

function NewsScreen ({ news, fetchNewsSuccess }) {
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(
                    'https://newsapi.org/v2/top-headlines?country=us&apiKey=30bc5fff4e7b45bc934bc29e5077b2da'
                );
                fetchNewsSuccess(response.data.articles);
                // console.log('News:', response.data.articles);
            } catch (error) {
                console.error('Error fetching news:', error); // Додайте цей рядок
            }
        };

        fetchNews();
    }, [fetchNewsSuccess]);

    return (
        <View>
            <Text>Latest News</Text>
            <FlatList
                data={news}
                keyExtractor={(item, index) => `${item.title}-${index}`}
                renderItem={({ item }) => (
                    <View key={item.title}>
                        <Text>{item.title}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const mapStateToProps = (state) => ({
    news: state.news.news,
});

export default connect(mapStateToProps, { fetchNewsSuccess })(NewsScreen);
