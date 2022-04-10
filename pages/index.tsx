import { Blob } from 'buffer';
import { useState } from 'react';
import JSONPretty from 'react-json-pretty';
import { Button } from '@mui/material';
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
      <div>
        <form onSubmit={handleOnSubmit}>
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

            <Button
                type='submit'
                variant='outlined'
                color='secondary'
            >
                Submit
            </Button>
        </form>
          {
              convertedJson && (
                  <JSONPretty id='json-pretty' data={convertedJson} />
              )
          }
      </div>
  )
}

export default HomePage;
