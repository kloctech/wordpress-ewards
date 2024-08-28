import React from "react";

const Homepage = () => {
  const styles = {
    container: {
      padding: "0 20px",
      fontSize: "1rem",
    },
    heading: {
      color: "#41225d",
      textAlign: "center",
      padding: "20px 0",
      fontSize: "1.4rem",
    },
    sectionHeading: {
      marginTop: "20px",
      fontWeight: "bold",
      fontSize: "1rem",
    },
    paragraph: {
      fontSize: "1rem",
      textAlign: "start",
    },
    list: {
      marginLeft: "20px",
      paddingLeft: "20px",
      listStyleType: "disc",
    },
    listItem: {
      marginBottom: "10px",
    },
    boldText: {
      fontWeight: "bold",
    },
    secondHeading: {
      marginTop: "20px",
      fontSize: "1rem",
      marginBottom: "0rem",
    },
  };

  return (
    <React.Fragment>
      <h4 style={styles.heading}>Woo Commerce</h4>
      <div style={styles.container}>
        <p style={styles.paragraph}>ABOUT eWards Page</p>
        <p style={styles.paragraph}>
          eWards is a cloud-based platform trusted by 2000+ enterprises for analyzing customer behavior and executing data-driven, omnichannel, hyper-personalized campaigns at scale. Known for its advanced system and exceptional support, eWards boasts a 98% client retention rate. By integrating all
          customer contact points, it organizes, streamlines, and synchronizes interactions, enhancing relationships with current customers while effectively targeting new ones.
        </p>
        <h6 style={styles.sectionHeading}>
          <b>eWards CRM Tools:</b>
        </h6>

        <h1 style={styles.secondHeading}>nGage:</h1>
        <p style={styles.paragraph}>This platform offers tools to boost customer engagement and retention, including:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <b>Audience Segmentation:</b> Personalize experiences to increase engagement and loyalty.
          </li>
          <li style={styles.listItem}>
            <b>RFM Analysis:</b> Gain insights into customer behaviour and optimize marketing strategies.
          </li>
          <li style={styles.listItem}>
            <b>Real-Time Reporting:</b> Make informed decisions with up-to-date data.
          </li>
          <li style={styles.listItem}>
            <b>Automation:</b> Deliver timely, targeted communication to improve satisfaction and feedback.
          </li>
        </ul>

        <h1 style={styles.secondHeading}>enGine:</h1>
        <p style={styles.paragraph}>Enhance customer loyalty and connections with nGine:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <b>Integrated Feedback Analysis:</b> Resolve complaints quickly with real-time insights.
          </li>
          <li style={styles.listItem}>
            <b>Tailored Rewards and Coupons:</b> Encourage loyalty with personalized incentives.
          </li>
          <li style={styles.listItem}>
            <b>Referral Program Suite:</b> Boost word-of-mouth marketing and organic growth.
          </li>
          <li style={styles.listItem}>
            <b>Fraud Detection:</b> Protect your brand’s integrity.
          </li>
        </ul>

        <h1 style={styles.secondHeading}>nVoice:</h1>
        <p style={styles.paragraph}>Streamline your transactional operations with nVoice:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <b>Digital Transaction Management:</b> Make transactions paperless and efficient.
          </li>
          <li style={styles.listItem}>
            <b>Insightful Transaction Summaries:</b> Gain key insights into sales and preferences.
          </li>
          <li style={styles.listItem}>
            <b>Promotional Banners:</b> Enhance engagement and conversions.
          </li>
          <li style={styles.listItem}>
            <b>Seamless Integration:</b> Integrate all your business tools for better productivity.
          </li>
        </ul>

        <h1 style={styles.secondHeading}>Analytics:</h1>
        <p style={styles.paragraph}>Empower your business with Analytics:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <b>Dynamic Dashboard:</b> Discover data-driven insights.
          </li>
          <li style={styles.listItem}>
            <b>Smart Insights:</b> Highlight success and opportunities with KPI visualizations.
          </li>
          <li style={styles.listItem}>
            <b>Real-Time Updates:</b> Stay current with the latest data.
          </li>
          <li style={styles.listItem}>
            <b>Predictive Intelligence:</b> Anticipate market trends.
          </li>
          <li style={styles.listItem}>
            <b>Customizable Dashboards:</b> Tailor analytics to your business needs.
          </li>
        </ul>

        <h1 style={styles.secondHeading}>nHance:</h1>
        <p style={styles.paragraph}>Maximize your marketing impact with consultancy:</p>
        <ul style={styles.list}>
          <li style={styles.listItem}>
            <b>Expert Guidance:</b> Identify insights and address pain points.
          </li>
          <li style={styles.listItem}>
            <b>Custom Campaigns:</b> Design strategies aligned with your brand.
          </li>
          <li style={styles.listItem}>
            <b>A/B Testing and Analytics:</b> Execute and optimize campaigns precisely.
          </li>
          <li style={styles.listItem}>
            <b>Strategic Collaborations:</b> Achieve consistent, effective marketing results.
          </li>
        </ul>
        <br />
        <h2>
          <b>Brands We Work With:</b>
        </h2>
        <p style={styles.paragraph}>Logos of Ginesys clients</p>
        <p style={styles.paragraph}>Tommy Hilfiger, Bagline, Iconic, The Irish House, Citi Style, Levels, Social, Beer Café, Chai Break. (logos) </p>
      </div>
    </React.Fragment>
  );
};

export default Homepage;
