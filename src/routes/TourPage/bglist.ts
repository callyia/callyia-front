interface BgItem {
  id: number;
  bgimage: string;
}

interface BgData {
  bg: BgItem[];
}

const bglist: BgData = {
  bg: [
    {
      id: 1,
      bgimage: "/dummyimages_second/1.png",
    },
    {
      id: 2,
      bgimage: "/dummyimages_second/2.jpg",
    },
    {
      id: 3,
      bgimage: "/dummyimages_second/3.png",
    },
    {
      id: 4,
      bgimage: "/dummyimages_second/4.png",
    },
    {
      id: 5,
      bgimage: "/dummyimages_second/5.png",
    },
    {
      id: 6,
      bgimage: "/dummyimages_second/6.png",
    },
    {
      id: 7,
      bgimage: "/dummyimages_second/7.png",
    },
  ],
};

export default bglist;
