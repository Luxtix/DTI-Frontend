const footerItems = [
  {
    title: "Account",
    links: [
      { text: "Profile", url: "/profile" },
      { text: "List Events", url: "/events" },
      { text: "Tickets", url: "/my-tickets" },
      { text: "Interested", url: "/interested" },
    ],
  },
  {
    title: "Categories",
    links: [
      { text: "Entertainment", url: "/events?category=entertainment" },
      {
        text: "Educational & Business",
        url: "/events?category=educational-business",
      },
      { text: "Cultural & Arts", url: "/events?category=arts-culture" },
      { text: "Sports & Fitness", url: "/events?category=sports-fitness" },
      {
        text: "Technology & Innovation",
        url: "/events?category=technology-innovation",
      },
      { text: "Travel & Outdoor", url: "/events?category=travel-adventure" },
    ],
  },
];

export default footerItems;
