import React, { useState, useEffect } from "react";
import axios from "axios";

const Homepage = () => {
  const headingColor = {
    color: "#41225d",
  };
  return (
    <React.Fragment>
      <h4 className="text-center p-4" style={headingColor}>
        Woo commerce
      </h4>
      <div className="container px-5 fs-6">
        <p className="fs-6">ABOUT eWards Page</p>
        <p className="text-start fs-6">
          eWards is a cloud-based platform trusted by 2000+ enterprises for analyzing customer behavior and executing data-driven, omnichannel, hyper-personalized campaigns at scale. Known for its advanced system and exceptional support, eWards boasts a 98% client retention rate. By integrating all
          customer contact points, it organizes, streamlines, and synchronizes interactions, enhancing relationships with current customers while effectively targeting new ones.
        </p>
        <h6>
          <b>eWards CRM Tools:</b>
        </h6>

        <h6 className="mt-3">nGage:</h6>
        <p className="fs-6">This platform offers tools to boost customer engagement and retention, including:</p>
        <div className="ms-4">
          <li>
            <b>Audience Segmentation:</b> Personalize experiences to increase engagement and loyalty.
          </li>
          <li>
            <b>RFM Analysis:</b> Gain insights into customer behaviour and optimize marketing strategies.
          </li>
          <li>
            <b>Real-Time Reporting:</b> Make informed decisions with up-to-date data.
          </li>
          <li>
            <b>Automation:</b> Deliver timely, targeted communication to improve satisfaction and feedback.
          </li>
        </div>

        <h6 className="mt-3">enGine:</h6>
        <p className="fs-6">Enhance customer loyalty and connections with nGine:</p>
        <div className="ms-4">
          <li>
            <b>Integrated Feedback Analysis:</b> Resolve complaints quickly with real-time insights.
          </li>
          <li>
            <b>Tailored Rewards and Coupons:</b> Encourage loyalty with personalized incentives.
          </li>
          <li>
            <b>Referral Program Suite:</b> Boost word-of-mouth marketing and organic growth.
          </li>
          <li>
            <b>Fraud Detection:</b> Protect your brand’s integrity.
          </li>
        </div>

        <h6 className="mt-3">nVoice:</h6>
        <p className="fs-6">Streamline your transactional operations with nVoice:</p>
        <div className="ms-4">
          <li>
            <b>Digital Transaction Management:</b> Make transactions paperless and efficient.
          </li>
          <li>
            <b>Insightful Transaction Summaries:</b> Gain key insights into sales and preferences.
          </li>
          <li>
            <b>Promotional Banners:</b> Enhance engagement and conversions.
          </li>
          <li>
            <b>Seamless Integration:</b> Integrate all your business tools for better productivity.
          </li>
        </div>

        <h6 className="mt-3">Analytics:</h6>
        <p className="fs-6">Empower your business with Analytics:</p>
        <div className="ms-4">
          <li>
            <b>Dynamic Dashboard:</b> Discover data-driven insights.
          </li>
          <li>
            <b>Smart Insights:</b> Highlight success and opportunities with KPI visualizations.
          </li>
          <li>
            <b>Real-Time Updates:</b> Stay current with the latest data.
          </li>
          <li>
            <b>Predictive Intelligence:</b> Anticipate market trends.
          </li>
          <li>
            <b>Customizable Dashboards:</b> Tailor analytics to your business needs.
          </li>
        </div>

        <h6 className="mt-3">nHance:</h6>
        <p className="fs-6">Maximize your marketing impact with consultancy:</p>
        <div className="ms-4">
          <li>
            <b>Expert Guidance:</b> Identify insights and address pain points.
          </li>
          <li>
            <b>Custom Campaigns:</b> Design strategies aligned with your brand.
          </li>
          <li>
            <b>A/B Testing and Analytics:</b> Execute and optimize campaigns precisely.
          </li>

          <li>
            <b>Strategic Collaborations:</b> Achieve consistent, effective marketing results.
          </li>
        </div>
        <br />
        <h5>
          <b>Brands We Work With:</b>
        </h5>
        <br />
        <p className="fs-6">Logos of Ginesys clients</p>
        <p className="fs-6">Tommy Hilfiger, Bagline, Iconic, The Irish House, Citi Style, Levels, Social, Beer Café, Chai Break. (logos) </p>
        {/* <h6>Types of Loyalty:</h6>
        <ol className="list-group list-group-numbered m-0">
          <li className="list-group-item d-flex justify-content-between align-items-start mb-0">
            <div className="ms-2 me-auto">
              <span className="fw-bold">Flat Loyalty:</span>
              <span>It is a fixed % given to customers on their every bill.</span>
            </div>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start mb-0">
            <div className="ms-2 me-auto">
              <span className="fw-bold">Tier Based/Lifetime Bill:</span>
              <span>Loyalty % of customer tiers according to different slabs they are falling under in terms of lifetime bill with the brand.</span>
            </div>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start mb-0">
            <div className="ms-2 me-auto">
              <span className="fw-bold">Instant Billing:</span>
              <span>Loyalty % depends on customers' instant bill value. Different bill values are given loyalty % accordingly.</span>
            </div>
          </li>

          <li className="list-group-item d-flex justify-content-between align-items-start mb-0">
            <div className="ms-2 me-auto">
              <span className="fw-bold">Day-wise: </span>
              <span>Setting loyalty % according to different days of the week.</span>
            </div>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start mb-0">
            <div className="ms-2 me-auto">
              <span className="fw-bold">Time-wise:</span>
              <span>Setting loyalty % according to different times of day.</span>
            </div>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start mb-0">
            <div className="ms-2 me-auto">
              <span className="fw-bold">Segment-wise:</span>
              <span>Customers while filling out the feedback have to select a few options. The options can be treated as a parameter to bucket all the customers selecting the particular option.</span>
            </div>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start mb-0">
            <div className="ms-2 me-auto">
              <span className="fw-bold">Tier Based/Lifetime Bill:</span>
              <span>Loyalty % of customer tiers according to different slabs they are falling under in terms of lifetime bill with the brand.</span>
            </div>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-start mb-0">
            <div className="ms-2 me-auto">
              <span className="fw-bold">Feedback Loyalty: </span>
              <span>Customers while filling out the feedback have to select a few options. The options can be treated as a parameter to bucket all the customers selecting the particular option.</span>
            </div>
          </li>
        </ol> */}
      </div>
    </React.Fragment>
  );
};

export default Homepage;
