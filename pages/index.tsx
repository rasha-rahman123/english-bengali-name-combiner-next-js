import Link from "next/link";
import { useState } from "react";
import {Box, Button, Text} from 'rebass';

async function fetchName() {
  const res = await fetch("/api/hello");
  const brin = await res.json();
  const rerBrin: String[] = await brin["combined"];

  return rerBrin;
}

const IndexPage = () => {
  const [name, setName] = useState<String>();
  const [name1, setName1] = useState<String>();

  const fetchFunction = async () => {
    const d: String[] = await fetchName();
    setName(d[0][0].toUpperCase() + d[0].substr(1));
    setName1(d[1][0].toUpperCase() + d[1].substr(1));
  };

  return (
    <Box sx={{p: 4, display: 'flex', flexDirection: 'column', height: '100vh',alignItems: 'center', justifyContent: 'center'}}>
      <Text as="h1" sx={{ textAlign: "center", color: '#2c2c2e' }}>Bengali-English Name Combiner</Text>
      <Text as="h5" sx={{ textAlign: "center", color: '#2c2c2e' }}>this breaks if you use it too fast</Text>
      <p>
        {!name && (
          <Link href="#">
            <Button sx={{textAlign: 'center',fontSize: 3, bg: 'skyblue', color: '#2c2c2e', fontWeight: 800, cursor: 'pointer'}} onClick={() => fetchFunction()}>GET NAME</Button>
          </Link>
        )}
      </p>
      <h3 style={{ textAlign: "center" }}>
        {name && name} <br />
        {name1 && name1}
      </h3>
      <Text as="h5" onClick={() => window.location.reload()} sx={{cursor: 'pointer'}}>{name && 'try again?'}</Text>
    </Box>
  );
};

export default IndexPage;
