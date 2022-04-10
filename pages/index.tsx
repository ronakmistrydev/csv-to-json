import { Blob } from 'buffer';
import { useState } from 'react';
import JSONPretty from 'react-json-pretty';

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
            <input
                type='file'
                accept='text/csv'
                name='file'
                onChange={handleFileOnChange}
            />

            <button type='submit'>
                Submit
            </button>
        </form>
          {
              convertedJson && (
                  <JSONPretty id="json-pretty" data={convertedJson} />
              )
          }
      </div>
  )
}

export default HomePage;
