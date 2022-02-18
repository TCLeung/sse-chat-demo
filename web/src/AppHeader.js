import {Header, Title} from '@mantine/core';

function AppHeader(props) {
  return (
      <Header {...props}>
        <Title order={1}>SSE chat demo</Title>
      </Header>
  );
}

export default AppHeader;