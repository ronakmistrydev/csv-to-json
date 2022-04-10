import { Blob } from 'buffer';
import { useState } from 'react';
import JSONPretty from 'react-json-pretty';
import {Box, Button, Card, CardActions, CardContent, Container, Grid, Paper, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';

const Input = styled('input')({
    display: 'none',
});

function HomePage() {
 const [file, setFile] = useState<Blob>();
 const [convertedJson, setConvertedJson] = useState(null);

  const handleOnSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData();
      // @ts-ignore
      data.append('file', file as Blob);
      const response = await fetch('/api/csv-to-json',
          { method: 'POST', body: data })
          .then((data) => data.json())

      setConvertedJson(response);
      e.target.reset();
  }

  const handleFileOnChange = (e) => {
      setFile(e.target.files[0]);
  }

  return (
      <Box
          sx={{
              backgroundColor: 'text.secondary',
              height: '100vh',
              width: '100vw',
              display: 'flex',
              alignItems: 'center'
          }}
      >
          <Container maxWidth='md'>
              <Typography
                  gutterBottom
                  variant='h5'
                  sx={{
                      textTransform: 'uppercase',
                      textAlign: 'center',
                      color: '#f2f2f2',
                  }}
              >
                  CSV TO JSON Convertor
              </Typography>

              <Paper
                  sx={{
                      padding: 2
                  }}
              >
                  <form onSubmit={handleOnSubmit}>
                      <Grid
                          container
                          alignItems='center'
                          justifyContent='space-between'
                      >
                          <Grid item xs>
                              <label htmlFor='contained-button-file'>
                                  <Input
                                      accept='text/csv'
                                      id='contained-button-file'
                                      multiple
                                      onChange={handleFileOnChange}
                                      type='file'
                                  />
                                  <Button variant='contained' component='span'>
                                      Upload CSV
                                  </Button>
                                  {
                                      file && (
                                          <Typography
                                              sx={{
                                                  display: 'inline-block',
                                                  marginLeft: 2,
                                              }}
                                          >
                                              {file.name}
                                          </Typography>
                                      )
                                  }
                              </label>
                          </Grid>
                          <Grid item xs>
                              <Button
                                  type='submit'
                                  variant='outlined'
                                  color='secondary'
                              >
                                  Submit
                              </Button>
                          </Grid>
                      </Grid>
                  </form>
              </Paper>
              {
                  convertedJson && (
                      <JSONPretty id='json-pretty' data={convertedJson} />
                  )
              }
          </Container>
      </Box>
  )
}

export default HomePage;
