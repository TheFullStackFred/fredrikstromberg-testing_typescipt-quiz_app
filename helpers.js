// map enum

const result = (Object.keys(Categories) as (keyof typeof Categories)[]).map(
    (key, index) => {
      return Categories[key];
    },
  );
