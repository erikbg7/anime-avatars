import React from 'react';

type GenreInputHandler = {
  getGenre: () => string;
};

const GenreInput = React.forwardRef<GenreInputHandler>((_, ref) => {
  const [genre, setGenre] = React.useState<'man' | 'woman'>('man');

  React.useImperativeHandle(ref, () => ({ getGenre: () => genre }));

  return (
    <div className="mx-auto max-w-sm py-6">
      <h2>You want the image to reasemble a:</h2>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Husbando</span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-violet-500"
            onChange={() => setGenre('man')}
            checked={genre === 'man'}
          />
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Waifu</span>
          <input
            type="radio"
            name="radio-10"
            className="radio checked:bg-violet-500"
            onChange={() => setGenre('woman')}
            checked={genre === 'woman'}
          />
        </label>
      </div>
    </div>
  );
});

GenreInput.displayName = 'GenreInput';

export type { GenreInputHandler };
export default GenreInput;
