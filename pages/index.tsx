import { Blob } from 'buffer';
import {Box, Button, Container, Grid, Paper, Typography} from '@mui/material';
import { styled } from '@mui/material/styles';
import {ChangeEvent, useState} from 'react';
import JSONPretty from 'react-json-pretty';

const Input = styled('input')({
    display: 'none',
});

const bytesToMegaByte = (bytes: number) => (bytes/1024)/1024;

const copyToClipBoard = async (data: any) => {
    const text = JSON.stringify(data);
    if ('clipboard' in navigator) await navigator.clipboard.writeText(text);
    else alert('Copy feature is not supported by your browser');
}

function HomePage() {
 const MAX_FILE_SIZE = 2; //MB
 const [file, setFile] = useState<File>();
 const [convertedJson, setConvertedJson] = useState(null);

    //TODO:: Define type
    const handleOnSubmit = async (event: any) => {
      event.preventDefault();
      const data = new FormData();
      // @ts-ignore
      data.append('file', file as Blob);

      const response = await fetch('/api/csv-to-json', { method: 'POST', body: data })
          .then((data) => data.json())
          .catch(error => {  alert(error.message); });

      setConvertedJson(response);
      event.target.reset();
    }

    const handleFileOnChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;
      const inputFile = event.target.files.item(0);
      if (!inputFile) return;
      const { size } = inputFile;
      if (bytesToMegaByte(size) > MAX_FILE_SIZE) alert('File size should not be greater then 2 MB :( ');
      setFile(inputFile);
    }

    const handleOnCopyClick = () => {
        copyToClipBoard(convertedJson);
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
                                  {
                                      file && (
                                          <Typography
                                              sx={{
                                                  marginLeft: 2,
                                                  display: 'inline-block',
                                              }}>
                                              {file.name}
                                          </Typography>
                                      )
                                  }

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
                      <>
                          <Paper
                              sx={{
                                  overflow: 'scroll',
                                  marginTop: 2,
                                  maxHeight: '400px',
                              }}
                          >
                              <JSONPretty id='json-pretty' data={convertedJson} />
                          </Paper>

                          <Button
                              type='button'
                              variant='contained'
                              sx={{
                                  marginTop: 2,
                              }}
                              onClick={handleOnCopyClick}
                          >
                              Copy
                          </Button>
                      </>
                  )
              }
          </Container>
      </Box>
    )
}

export default HomePage;
