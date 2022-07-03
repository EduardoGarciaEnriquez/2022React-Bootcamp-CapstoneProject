import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';

export function useFeaturedCategories() {
    const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
    const [featuredCategories, setFeaturedCategories] = useState(() => ({
        categories: {},
        fetchingCategories: true,
    }));

    useEffect(() => {
        if (!apiRef || isApiMetadataLoading) {
            return () => { };
        }

        const controller = new AbortController();

        async function getFeaturedCategories() {
            try {
                setFeaturedCategories({ categories: {}, fetchingCategories: true });
                let categories = [];
                const response = await fetch(
                    `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
                        '[[at(document.type, "category")]]'
                    )}&lang=en-us&pageSize=30`,
                    {
                        signal: controller.signal,
                    }
                );

                if (response.status === 200) {
                    categories = await response.json();
                }
                else {
                    console.log('Categories response: ',response);
                }

                setFeaturedCategories({ categories, fetchingCategories: false });
            } catch (err) {
                setFeaturedCategories({ categories: {}, fetchingCategories: false });
                console.error(err);
            }
        }

        getFeaturedCategories();

        return () => {
            controller.abort();
        };
    }, [apiRef, isApiMetadataLoading]);

    return featuredCategories;
}
