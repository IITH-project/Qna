import { Stack } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";

const ChatLoading = () => {
  return (
    <Stack w={'80%'} m='auto'>
      <Skeleton height="45px" opacity={'0.2'}/>
      <Skeleton height="45px" opacity={'0.2'}/>
      <Skeleton height="45px" opacity={'0.2'}/>
      <Skeleton height="45px" opacity={'0.2'}/>
      <Skeleton height="45px" opacity={'0.2'}/>
      <Skeleton height="45px" opacity={'0.2'}/>
      <Skeleton height="45px" opacity={'0.2'}/>
      <Skeleton height="45px" opacity={'0.2'}/>
      <Skeleton height="45px" opacity={'0.2'}/>
      <Skeleton height="45px" opacity={'0.2'}/>
      <Skeleton height="45px" opacity={'0.2'}/>
      <Skeleton height="45px" opacity={'0.2'}/>
    </Stack>
  );
};

export default ChatLoading;
