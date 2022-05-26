import tw from "tailwind-styled-components";
const CardSlider = ({ userList, knowUser, setUser }) => {
  return (
    <Div data-carousel="static">
      <LeftSlide
        data-carousel-prev
        onClick={(e) => {
          if (knowUser == 0) {
            setUser(userList.length - 1);
          } else {
            setUser(knowUser - 1);
          }
        }}
      >
        <Span>
          <Svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </Svg>
          <span className="hidden">Previous</span>
        </Span>
      </LeftSlide>
      {userList[knowUser]}
      <RightSlide
        data-carousel-next
        onClick={(e) => {
          if (knowUser == userList.length - 1) {
            setUser(0);
          } else {
            setUser(knowUser + 1);
          }
        }}
      >
        <Span>
          <Svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            ></path>
          </Svg>
          <span className="hidden">Next</span>
        </Span>
      </RightSlide>
    </Div>
  );
};
const Div = tw.div`
flex
items-center
m-2
`;
const LeftSlide = tw.button`
flex 
justify-center 
items-center 
px-4 
h-full 
cursor-pointer 
group
focus:outline-none
`;
const RightSlide = tw.button`
flex  
justify-center 
items-center 
px-4 
h-full 
cursor-pointer 
group 
focus:outline-none
`;
const Span = tw.span`
inline-flex 
justify-center 
items-center 
w-10 
h-10 
rounded-full 
bg-white/30 
dark:bg-white-800/30 
group-hover:bg-white/50 
dark:group-hover:bg-white-800/60 
group-focus:ring-4 
group-focus:ring-white 
dark:group-focus:ring-white-800/70 
group-focus:outline-none
`;
const Svg = tw.svg`
w-6 
h-6 
text-white 
dark:text-blue-800
fill-transparent
stroke-current
`;

export default CardSlider;
