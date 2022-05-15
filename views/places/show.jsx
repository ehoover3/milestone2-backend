const React = require("react");
const Def = require("../default");

function show(data) {
  // if no comments exist...
  let comments = <h3 className='inactive'>No comments yet!</h3>;

  // if comments exist...
  if (data.place.comments.length) {
    comments = data.place.comments.map((c) => {
      return (
        <div className='border'>
          <h2 className='rant'>{c.rant ? "Rant! 😡" : "Rave! 😻"}</h2>
          <div>{c.content}</div>
          <div>- {c.author}</div>
          <h4>Rating: {c.stars}</h4>
          <form method="POST" action={`/places/${data.place.id}/comment/${c.id}?_method=DELETE`}>
            <input type="submit" className="btn btn-danger" value="Delete Comment" />
          </form>
 
        </div>
      );
    });
  }



 
   







  // if no rating exists...
  let rating = <div className='inactive'>Not yet rated</div>;
  let stars = "";

  // if ratings exists...
  if (data.place.comments.length) {
    let sumRatings = data.place.comments.reduce((tot, c) => {
      return tot + c.stars;
    }, 0);
    let averageRating = Math.round(sumRatings / data.place.comments.length);
    rating = <h3>{Math.round(averageRating)} stars</h3>;
    stars = "";
    for (let i = 0; i < averageRating; i++) {
      stars += "⭐️";
    }
  }

  return (
    <Def>
      <main>
        <div className='row'>
          <div className='col-sm-6'>
            <img src={data.place.pic} alt={data.place.name} />
            <div>
              Located in {data.place.city}, {data.place.state}
            </div>
          </div>
          <div className='col-sm-6'>
            <h2>Description</h2>
            <div>{data.place.showEstablished()}</div>
            <div>Serving {data.place.cuisines}</div>
            <div>Rating {stars} stars</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          {/* Edit */}
          <a href={`/places/${data.place.id}/edit`}>
            <button className='btn btn-outline-primary'>Edit</button>
          </a>

          {/* Delete */}
          <form action={`/places/${data.place.id}?_method=DELETE`} method='POST'>
            <input className='btn btn-danger' type='submit' value='Delete Place' />
          </form>
        </div>

        <hr />
        <h2>Comments</h2>
        {comments}

        {/* Add Comment Form */}
        <form method='POST' action={`/places/${data.place.id}/comment`}>
          <div className='form-group'>
            <label htmlFor='author'>Author</label>
            <input className='form-control' id='author' name='author' />
          </div>

          <div className='form-group'>
            <label htmlFor='content'>Content</label>
            <input className='form-control' id='content' name='content' type='textarea' />
          </div>

          <div className='form-group'>
            <label htmlFor='stars'>Star Rating</label>
            <input
              className='form-control'
              id='stars'
              name='stars'
              type='range'
              step='0.5'
              min='0'
              max='5'
            />
          </div>

          <div className='form-group'>
            <label htmlFor='rant'>Rant</label>
            <input id='rant' name='rant' type='checkbox' defaultChecked />
          </div>

          <input className='btn btn-primary' type='submit' value='Add Comment' />
        </form>
      </main>
    </Def>
  );
}

module.exports = show;
