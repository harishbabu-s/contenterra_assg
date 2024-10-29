// ItemList.js
import React from 'react';

const ItemList = React.lazy(() => import('./ItemListComponent'));

const ItemListComponent = ({ items }) => {
    return (
        <>
            {items.map((item) => (
                <div className="card border-dark border-2 p-3 mt-2">
                    <h5>{item.title}</h5>
                    {item.selftext && <p className='border border-1 p-2'>{item.selftext}</p>}
                    <a href={item.url}>{item.url}</a>
                    <p>score : {item.score}</p>
                </div>
            ))}
        </>
    );
};

export default ItemListComponent;
