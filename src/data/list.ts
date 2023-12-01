interface DummyItem {
  id: number;
  title: string;
  content: string;
  area: string;
}

interface DummyData {
  dummy: DummyItem[];
}

const dummyData: DummyData = {
  dummy: [
    {
      id: 1,
      title: "광안대교",
      content: " have an alt prop, either with meaningful text, or an empty string for",
      area: "부산",
    },
    {
      id: 2,
      title: "광안",
      content: " have an alt prop, either with meaningful text, or an empty string for",
      area: "부산",
    },
    {
      id: 3,
      title: "안대교",
      content: " have an alt prop, either with meaningful text, or an empty string for",
      area: "부산",
    },
    {
      id: 4,
      title: "대교",
      content: " have an alt prop, either with meaningful text, or an empty string for",
      area: "부산",
    },
    {
      id: 5,
      title: "광안대교",
      content: " have an alt prop, either with meaningful text, or an empty string for",
      area: "부산",
    },
    {
      id: 6,
      title: "광교",
      content: " have an alt prop, either with meaningful text, or an empty string for",
      area: "부산",
    },
  ],
};

export default dummyData;