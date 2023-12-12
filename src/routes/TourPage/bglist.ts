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
      bgimage: "/dummyimages_second/경복궁.png",
    },
    {
      id: 2,
      bgimage: "/dummyimages_second/동궁과월지.jpg",
    },
    {
      id: 3,
      bgimage: "/dummyimages_second/보성 녹차밭.png",
    },
    {
      id: 4,
      bgimage: "/dummyimages_second/북촌 한옥마을.png",
    },
    {
      id: 5,
      bgimage: "/dummyimages_second/숭례문.png",
    },
    {
      id: 6,
      bgimage: "/dummyimages_second/지리산국립공원.png",
    },
    {
      id: 7,
      bgimage: "/dummyimages_second/한라산 백록담.png",
    },
  ],
};

export default bglist;
