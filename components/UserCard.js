import tw from "tailwind-styled-components";

const UserCard = ({
  name,
  username,
  company,
  email,
  phone,
  website,
  imgURL,
  onClick,
}) => {
  return (
    <Wrapper onClick={onClick} id="">
      <Header>
        <Company>{company}</Company>
      </Header>
      <Details>
        <Left>
          <Img src={imgURL} />
          <Website
            style={{ fontFamily: '"Montserrat",sans-serif' }}
            href={`https://${website}`}
          >
            {website}
          </Website>
        </Left>
        <Right style={{ fontFamily: '"Montserrat",sans-serif' }}>
          <Names>
            <Name>{name}</Name>
            <UserName>@{username}</UserName>
          </Names>
          <WorkContact>
            <Email>{email}</Email>
            <Phone>{phone}</Phone>
          </WorkContact>
        </Right>
      </Details>
    </Wrapper>
  );
};
const Header = tw.div`
flex
justify-center
pb-3
`;
const Wrapper = tw.div`
 flex
 flex-col
    hover:cursor-pointer
 h-60
 w-96
 bg-white
 p-3
 rounded-lg
 font-sans
 transition-all
`;
const Left = tw.div`
flex
px-2
flex-col
justify-center
items-center
w-40
bg-blue-300
rounded-l-lg

`;
const Right = tw.div`
flex
px-2
text-white
flex-col
justify-center
flex-1
w-24
bg-blue-300
rounded-r-lg
`;
const Details = tw.div`
flex
flex-1
`;
const Names = tw.div`
flex
flex-col
justify-center
`;
const Name = tw.div`
font-semibold
text-lg
`;
const UserName = tw.p``;
const Img = tw.img`
h-24
w-24
`;
const Website = tw.a`
flex
justify-center
text-white
text-xs
font-semibold
mt-1
`;

const WorkContact = tw.div`
mt-2
text-sm
`;
const Company = tw.div`
flex
justify-center
text-2xl
text-white
font-bold
bg-blue-300
w-full
rounded-md
px-2
py-1
`;
const Email = tw.div`

`;
const Phone = tw.div`
`;
export default UserCard;
