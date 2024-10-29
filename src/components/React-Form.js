import React, { useEffect, useState } from 'react';
const ReactForum = () => {
    const [card, setCard] = useState([]);
    const getData = async () => {
        const result = []
        // await fetch('https://www.reddit.com/r/reactjs.json')
        //   .then((res) => res.json())
        //   .then((data) => data.data.children.map((i) => {
        //     result.push({ title: i.data.title, selftext: i.data.selftext, url: i.data.url, score: i.data.score })
        //   })).catch((err) => console.log(err))

        // setCard(result)


        try {
            const response = await fetch("https://www.reddit.com/r/reactjs.json");
            const data = await response.json();
            data.data.children.map((i) => {
                result.push({ title: i.data.title, selftext: i.data.selftext, url: i.data.url, score: i.data.score })
            })
            setCard(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(() => {
        getData();
    }, [])


    return (
        <div className='container'>
            <h3 className='ms-5 mt-3 fw-bold'>React Forum</h3>
            <div className='card-container  p-1 m-3'>
                {card.map((item) => (
                    <div className="card border-dark border-2 p-3 mb-3">
                        <h5>{item.title}</h5>
                        {item.selftext && <p className='border  '>{item.selftext}</p>}
                        <a href={item.url}>{item.url}</a>
                        <p>score : {item.score}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ReactForum;
