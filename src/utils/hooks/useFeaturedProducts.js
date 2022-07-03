import { useState, useEffect } from 'react';
import { API_BASE_URL } from '../constants';
import { useLatestAPI } from './useLatestAPI';

export function useFeaturedProducts() {
    const { ref: apiRef, isLoading: isApiMetadataLoading } = useLatestAPI();
    const [featuredProducts, setFeaturedProducts] = useState(() => ({
        products: {},
        fetchingProducts: true,
    }));

    useEffect(() => {
        if (!apiRef || isApiMetadataLoading) {
            return () => { };
        }

        const controller = new AbortController();

        async function getFeaturedProducts() {
            try {
                setFeaturedProducts({ products: {}, fetchingProducts: true });
                let products = [];
                const response = await fetch(
                      `${API_BASE_URL}/documents/search?ref=${apiRef}&q=${encodeURIComponent(
                        '[[at(document.type, "product")]]'
                      )}&lang=en-us&pageSize=16`,
                    {
                        signal: controller.signal,
                    }
                );

                if (response.status === 200) {
                    products = await response.json();
                }
                else {
                    console.log('Products response: ',response);
                }
                
                setFeaturedProducts({ products, fetchingProducts: false });
            } catch (err) {
                setFeaturedProducts({ products: {}, fetchingProducts: false });
                console.error(err);
            }
        }

        getFeaturedProducts();

        return () => {
            controller.abort();
        };
    }, [apiRef, isApiMetadataLoading]);

    return featuredProducts;
}
