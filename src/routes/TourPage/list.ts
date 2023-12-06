interface DummyItem {
  id: number;
  title: string;
  name: string;
  content: string;
  area: string;
  image: string;
}

interface DummyData {
  dummy: DummyItem[];
}

const dummyData: DummyData = {
  dummy: [
    {
      id: 1,
      title: "관광지",
      name: "광안대교",
      content:
        " have an alt prop, either with meaningful text, or an empty string for",
      area: "부산",
      image: "/dummyimages_second/river.jpg",
    },
    {
      id: 2,
      title: "관광지",
      name: "감천마을",
      content:
        " have an alt prop, either with meaningful text, or an empty string for",
      area: "부산",
      image: "/dummyimages_second/gamchun.jpg",
    },
    {
      id: 3,
      title: "관광지",
      name: "광안대교",
      content:
        " have an alt prop, either with meaningful text, or an empty string for",
      area: "부산",
      image: "/dummyimages_second/river.jpg",
    },
    {
      id: 4,
      title: "관광지",
      name: "국제시장",
      content:
        " have an alt prop, either with meaningful text, or an empty string for",
      area: "부산",
      image: "/dummyimages_second/market.jpg",
    },
    {
      id: 5,
      title: "관광지",
      name: "광안대교",
      content:
        " have an alt prop, either with meaningful text, or an empty string for",
      area: "대전",
      image: "/dummyimages_second/river.jpg",
    },
    {
      id: 6,
      title: "관광지",
      name: "광안대교",
      content:
        " have an alt prop, either with meaningful text, or an empty string for",
      area: "서울",
      image: "/dummyimages_second/river.jpg",
    },
    {
      id: 7,
      title: "음식점",
      name: "유가네",
      content:
        " have an alt prop, either with meaningful text, or an empty string for",
      area: "서울",
      image: "/dummyimages_second/river.jpg",
    },
    {
      id: 8,
      title: "음식점",
      name: "뼈해장국",
      content:
        " have an alt prop, either with meaningful text, or an empty string for",
      area: "부산",
      image: "/dummyimages_second/river.jpg",
    },
    {
      id: 9,
      title: "음식점",
      name: "칼국수",
      content:
        " have an alt prop, either with meaningful text, or an empty string for",
      area: "대전",
      image: "/dummyimages_second/river.jpg",
    },
  ],
};

export default dummyData;
