import { Blob } from 'buffer';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import JSONPretty from 'react-json-pretty';

const Input = styled('input')({
    display: 'none',
});

function HomePage() {
 const [file, setFile] = useState<Blob>();
 const [convertedJson, setConvertedJson] = useState(null);

    //TODO:: Define type
    const handleOnSubmit = async (event: any) => {
      event.preventDefault();
      const data = new FormData();
      // @ts-ignore
      data.append('file', file as Blob);

      const response = await fetch('/api/csv-to-json', { method: 'POST', body: data })
          .then((data) => data.json())

      setConvertedJson(response);
      event.target.reset();
    }

    //TODO:: Define type
    const handleFileOnChange = (event: any) => {
      setFile(event.target.files[0]);
    }

    return (
      <Box
          py={4}
          sx={{
              backgroundColor: 'text.secondary',
              minHeight: '100vh',
              width: '100vw',
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
                              </label>
                          </Grid>
                          <Grid
                              item
                              xs
                              sx={{
                                  display: 'flex',
                                  justifyContent: 'end'
                              }}>
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
                      <Paper
                          sx={{
                              overflow: 'scroll',
                              marginTop: 2,
                              padding: 2,
                          }}
                      >
                          <JSONPretty id='json-pretty' data={convertedJson} />
                      </Paper>
                  )
              }
          </Container>
      </Box>
    )
}

export default HomePage;
