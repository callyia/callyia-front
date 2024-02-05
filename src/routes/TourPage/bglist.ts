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
      bgimage: "/dummyimages_second/12.jpg",
    },
    {
      id: 2,
      bgimage: "/dummyimages_second/13.jpg",
    },
    {
      id: 3,
      bgimage: "/dummyimages_second/14.jpg",
    },
    {
      id: 4,
      bgimage: "/dummyimages_second/15.jpg",
    },
    {
      id: 5,
      bgimage: "/dummyimages_second/16.jpg",
    },
    {
      id: 6,
      bgimage: "/dummyimages_second/17.jpg",
    },
    {
      id: 7,
      bgimage: "/dummyimages_second/18.jpg",
    },
  ],
};

export default bglist;
