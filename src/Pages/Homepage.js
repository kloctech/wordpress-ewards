import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Homepage = () => {
    const headingColor = {
        color: "#41225d",
    }
    return(
        <React.Fragment>
            <h4 className='text-center p-4' style={headingColor}>eWards</h4>
            <div className='container px-5'>
                <p className="text-start">eWards is an Integrated platform for customer retention and marketing automation.
                                We engage the audience through our immersive multi-channel strategies.
                                From customer insights to marketing orchestration, we provide our customers with everything
                                they need to personalise journeys at scale. With 150 tech alliances and 2000+ partner brands,
                                eWards is the fastest-growing SaaS company with a powerful and well-integrated
                                hyper-personalized Customer Experience Management Platform.</p>
                <h5>ACE (OMNI CHANNEL DATA-DRIVEN MARKETING HUB )</h5>
                <p className="text-start">Omni-channel customer engagement tool that lets businesses engage with their customers on a
                                hyper-personalized level. Helps brands to manage customer interactions through physical &
                                digital touchpoints that drive brand loyalty & increase revenue.
                </p>
                <p>ACE empowers you to create loyalty programs that will ultimately increase the frequency of
                                your customers' visits. It enables businesses to better understand their customer's behavior and
                                preferences, and create customized rewards and incentives that encourage them to visit more
                                often and spend more money.</p>
                <h5>Key benefits of ACE:</h5>
                <p className="text-start">It allows businesses to track and analyze customer
                                        behaviour, giving them valuable insights into their customers' purchasing patterns, frequency of
                                        visits, and overall satisfaction levels. Armed with this information, businesses can create
                                        personalized loyalty programs that cater to each customer's individual needs and preferences,
                                        making them feel valued and appreciated.</p>
                <p>In addition to creating customized loyalty programs, ACE also provides businesses with a range
                                    of powerful tools and features to help them manage their programs more efficiently. These
                                    include automated email and SMS marketing campaigns, real-time customer feedback and
                                    analytics, and detailed reporting and analysis tools to help businesses track their program's
                                    effectiveness and make data-driven decisions.</p>
                <p>Overall, ACE is a powerful tool for businesses looking to increase customer loyalty and
                                    engagement. By leveraging the latest technology and data analytics, ACE can help businesses
                                    create compelling loyalty programs that drive customer visits, boost revenue, and ultimately help
                                    them achieve long-term success.</p>
            
                <h6>Types of Loyalty:</h6>
            </div>
        </React.Fragment>
    )
}

export default Homepage;