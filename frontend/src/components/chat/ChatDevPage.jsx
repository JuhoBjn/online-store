import Chat from "./Chat";

const ChatDevPage = () => {
  const user = {
    id: "8724b15a-1901-4b48-a61d-503d4b6ee1ed",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3MjRiMTVhLTE5MDEtNGI0OC1hNjFkLTUwM2Q0YjZlZTFlZCIsInJvbGVfaWQiOjEsImlhdCI6MTcwMDc4NTg1NywiZXhwIjoxNzAxMzkwNjU3fQ.nv1s6e-wFTbvRZ1MpTrEbc47U-fP0WknBnkJglpanoQ",
    firstname: "Dave",
    lastname: "Smith"
  };

  const friend = {
    id: "239aec9f-066e-4e6a-88d7-9cdccd43445b",
    firstname: "Larry",
    lastname: "Smith"
  };

  console.log(user);
  return (
    <>
      <Chat
        user={user}
        friend={friend}
        eventId={"e1e1e1e1-e1e1-e1e1-e1e1-e1e1e1e1e1e1"}
        eventName={"Test Event"}
        isDisabled={false}
        disabledMessage="Can't message non friend"
      />
    </>
  );
};

export default ChatDevPage;
