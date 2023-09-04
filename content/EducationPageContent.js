export const EducationPageContent = (type) => {
  const content = {
    cards: [
      {
        slug: "/what-is-bitcoin",
        title: "What is Bitcoin?",
        description: "",
        category: "Bitcoin",
        image:
          "https://www.bitcoin.com/wp-content/uploads/2021/01/Bitcoin-101-What-is-Bitcoin-1.jpg",
      },
      {
        slug: "/what-is-fibonacci-retracement",
        title: "What is Fibonacci Retracement?",
        description: "",
        category: "Indicators",
        image: "",
      },
    ],
  };

  return content[type];
};
