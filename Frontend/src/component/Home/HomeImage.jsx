import React from 'react'
import homeleftImage from '../../images/homeleftImage.PNG'
import homerightImage from '../../images/homerightImage.PNG'
import CategoryCard from './CategoryCard';
import Typical from 'react-typical'

const HomeImage = () => {
    const cateData = [
        { url: 'https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100', text: 'Top Offers' },
        { url: 'https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100', text: 'Grocery' },
        { url: 'https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100', text: 'Mobile' },
        { url: 'https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100', text: 'Fashion' },
        { url: 'https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100', text: 'Electronics' },
        { url: 'https://rukminim1.flixcart.com/flap/128/128/image/ee162bad964c46ae.png?q=100', text: 'Home' },
        { url: 'https://rukminim1.flixcart.com/flap/128/128/image/0ff199d1bd27eb98.png?q=100', text: 'Appliances' },
        { url: 'https://rukminim1.flixcart.com/flap/128/128/image/71050627a56b4693.png?q=100', text: 'Travel' },
        { url: 'https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100', text: 'Beauty, Toys & More' }
    ];
    return <>
    <div style={{ height: '7rem' }}>

</div>
        <div className="homepageImage">
            <div className='lrimage'>
                <img className='leftImage' src={homeleftImage} />
                <img className='rightImage' src={homerightImage} />
            </div>
            <div className="firstheading">
                <p>CREATE YOU OWN STORE</p>
                <p className="sellheading typing-text">
                <Typical
                loop={Infinity}
                steps={[
                  
                  
                  "Buy Every Where with Best Buy  ",
                  2000,
                  "Best Buy",
                  2000,
                  "Better Product ",
                  2000,
                //   "Cross Platgorm Dev",
                //   1000,
                //   "React/React Native Dev",
                //   1000,
                  
                  
                 
                ]}
                />
                    </p>
            </div>
            

        </div>
        <div className='category'>
            <p> Our Category</p>
            <hr />
            <div className="categoryData">
                {
                    cateData.map((data) => (
                        <CategoryCard key={data.text} image={data} />
                    ))
                }


            </div>
        </div>
    </>
}

export default HomeImage