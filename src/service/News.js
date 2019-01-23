import { orderBy } from 'lodash';
import { articleUrl, language, category, API_KEY } from '../config/rest-config';

export async function getArticlesBySource() {

    try {
        
        let articles = await fetch(`${articleUrl}?category=${category}&language=${language}`,{
            headers:{
                'X-API-KEY':API_KEY
            }
        });

        let result = await articles.json();
        articles= null;

        return orderBy(result.articles,'publishedAt','desc');

    } catch (error) {
        
        throw error;
    }
}