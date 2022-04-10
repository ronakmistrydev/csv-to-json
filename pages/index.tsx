import {useState} from "react";
import {Blob} from "buffer";

function HomePage() {
 const [file, setFile] = useState<Blob>();

  const handleOnSubmit = async (e) => {
      e.preventDefault();
      const data = new FormData();
      // @ts-ignore
      data.append('file', file as Blob);

      const response = await fetch('/api/csv-to-json', {
          method: 'POST',
          body: data,
      })

      console.log({ data });
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
      </div>
  )
}

export default HomePage;
