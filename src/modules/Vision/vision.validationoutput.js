export const formatVisionResponse = (data) => {
  const result = {};

  // ✅ Description
  if (data.description?.captions?.length) {
    result.caption = data.description.captions[0].text;
  }

  // ✅ Tags
  if (data.tags?.length) {
    result.tags = data.tags.map(tag => ({
      name: tag.name,
      confidence: tag.confidence
    }));
  }

  // ✅ Objects
  if (data.objects?.length) {
    result.objects = data.objects.map(obj => ({
      name: obj.object,
      confidence: obj.confidence,
      box: obj.rectangle
    }));
  }

  // ✅ Faces
  if (data.faces?.length) {
    result.faces = data.faces.map(face => ({
      age: face.age,
      gender: face.gender,
      box: face.faceRectangle
    }));
  }

  // ✅ Brands
  if (data.brands?.length) {
    result.brands = data.brands.map(b => ({
      name: b.name,
      confidence: b.confidence
    }));
  }

  // ✅ Categories
  if (data.categories?.length) {
    result.categories = data.categories.map(c => ({
      name: c.name,
      score: c.score
    }));
  }

  // ✅ Colors
  if (data.color) {
    result.color = {
      dominant: data.color.dominantColors,
      foreground: data.color.dominantColorForeground,
      background: data.color.dominantColorBackground,
      accent: data.color.accentColor
    };
  }

  // ✅ Image Type
  if (data.imageType) {
    result.imageType = data.imageType;
  }

  // ✅ Adult Content
  if (data.adult) {
    result.adult = {
      isAdult: data.adult.isAdultContent,
      isRacy: data.adult.isRacyContent,
      score: data.adult.adultScore
    };
  }

  return result;
};