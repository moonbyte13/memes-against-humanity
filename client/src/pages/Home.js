
function Home() {

  function memeRedirect () {
    window.location.href = "/memes";
  }

  return (
    <div>
      <label onClick={memeRedirect} className='hover:cursor-pointer'>
        <h2>Memes</h2>
      </label>
    </div>
  );
}

export default Home;