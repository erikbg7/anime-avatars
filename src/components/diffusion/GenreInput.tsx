type Props = {
  genre: string;
  onGenreChange: (genre: string) => void;
};

function GenreInput(props: Props) {
  return (
    <div className="max-w-sm mx-auto py-6">
      <h2>You want the image to reasemble a:</h2>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Man</span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-violet-500"
            onChange={() => props.onGenreChange('man')}
            checked={props.genre === 'man'}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Woman</span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-violet-500"
            onChange={() => props.onGenreChange('woman')}
            checked={props.genre === 'woman'}
          />
        </label>
      </div>
    </div>
  );
}

export default GenreInput;
