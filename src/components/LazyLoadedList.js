import React, { useEffect, useState, useRef } from 'react';
import ItemListComponent from './ItemListComponent';

const LazyLoadedList = () => {
    const [items, setItems] = useState([]);
    const [displayedItems, setDisplayedItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [visibleCount, setVisibleCount] = useState(10); // Number of items to show at once
    const observer = useRef();

    // Fetch all items from the API
    const fetchItems = async () => {
        const result = []
        const response = await fetch('https://www.reddit.com/r/reactjs.json');
        const data = await response.json();
        data.data.children.map((i) => {
            result.push({ title: i.data.title, selftext: i.data.selftext, url: i.data.url, score: i.data.score })
        })
        setItems(result);
        setDisplayedItems(result.slice(0, visibleCount));
        setLoading(false);
    };

    useEffect(() => {
        fetchItems();
    }, []);

    const lastItemRef = useRef();

    useEffect(() => {
        const callback = (entries) => {
            if (entries[0].isIntersecting) {
                // Increase the number of visible items when the last item is in view
                setVisibleCount((prev) => Math.min(prev + 10, items.length)); // Load 10 more items
                setDisplayedItems(items.slice(0, Math.min(visibleCount + 10, items.length)));
            }
        };

        observer.current = new IntersectionObserver(callback);
        if (lastItemRef.current) {
            observer.current.observe(lastItemRef.current);
        }

        return () => {
            if (lastItemRef.current) {
                observer.current.unobserve(lastItemRef.current);
            }
        };
    }, [items, visibleCount]);

    return (
        <div className='container'>
            <h1>React Forum</h1>
            <ItemListComponent items={displayedItems} />
            {loading && <div>Loading...</div>}
            {displayedItems.length < items.length && <div ref={lastItemRef}>Loading more...</div>}
        </div>
    );
};

export default LazyLoadedList;
