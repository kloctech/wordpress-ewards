import React, { useState } from "react";

const Help = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const styles = {
    container: {
      maxWidth: "800px",
      //margin: "0 auto",
      //padding: "2rem",
    },
    header: {
      textAlign: "center",
      //padding: "1rem 0",
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    accordionItem: {
      borderBottom: "1px solid #ddd",
      padding: "0.5rem 0",
    },
    accordionHeader: {
      cursor: "pointer",
      padding: "1rem",
      fontSize: "1.2rem",
      backgroundColor: "#f8f8f8",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    accordionBody: {
      padding: "1rem",
      display: "none",
      transition: "display 0.3s ease",
    },
    accordionBodyOpen: {
      display: "block",
    },
    arrowIcon: {
      width: "1rem",
      height: "1rem",
      transition: "transform 0.3s ease",
    },
    arrowIconOpen: {
      transform: "rotate(180deg)",
    },
  };

  const accordionData = [
    {
      title: "What is the loyalty program and how does it work?",
      content: "Our loyalty program rewards customers for their continued support. By joining, you earn points for every purchase made online or in-store. These points can be redeemed for exclusive rewards and discounts.",
    },
    {
      title: "How can I join the loyalty program?",
      content: "Joining our loyalty program is simple. Sign up on our website or at any store location to start earning points immediately.",
    },
    {
      title: "Is there a cost to join the loyalty program?",
      content: "No, joining our loyalty program is free. It’s our way of thanking you for choosing our brand.",
    },
    {
      title: "What benefits do I receive as a member of the loyalty program?",
      content: "As a member, you earn points for every purchase, and receive exclusive discounts, early access to sales, special birthday rewards, and more. The more you shop, the more rewards you earn.",
    },
    {
      title: "How do I earn points in the loyalty program?",
      content: "Earn points for every purchase by providing your membership details at in-store checkouts or logging into your account online. Points will automatically be added to your account.",
    },
    {
      title: "How do I redeem my points for rewards?",
      content: "Redeem points by logging into your account on our website or visiting one of our stores. Choose from a variety of rewards and apply your points at checkout.",
    },
    {
      title: "Can I earn points for purchases made online and in-store?",
      content: "Yes, you can earn points for both online and in-store purchases. Ensure you log into your account online or provide your membership details in-store.",
    },
    {
      title: "Do my points expire?",
      content: "Points expire one year from the date they were earned. We’ll send you reminders to use your points before they expire.",
    },
    {
      title: "How often are new rewards added to the loyalty program?",
      content: "We update our rewards regularly to keep things exciting. New rewards are typically added every month, so check back often.",
    },
    {
      title: "Can I transfer my points to someone else?",
      content: "Currently, points are non-transferable and can only be used by the account holder.",
    },
  ];

  return (
    <React.Fragment>
      <div style={styles.container}>
        <h4 style={styles.header}>Help</h4>
        {accordionData.map((item, index) => (
          <div key={index} style={styles.accordionItem}>
            <div style={styles.accordionHeader} onClick={() => toggleAccordion(index)}>
              <span>{item.title}</span>
              <svg
                style={{
                  ...styles.arrowIcon,
                  ...(activeIndex === index ? styles.arrowIconOpen : {}),
                }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div
              style={{
                ...styles.accordionBody,
                ...(activeIndex === index ? styles.accordionBodyOpen : {}),
              }}
            >
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Help;
