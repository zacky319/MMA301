

export type Perfume = {
  id: string;
  perfumeName: string;
  price: number;
  description: string;
  brandName: string;
  isForFemale: boolean;
  image: string;
  feedbacks: Comment[];
  rating: number;
};

export type Comment = {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
};

// Function to fetch perfumes data from API
const fetchPerfumes = async (): Promise<Perfume[]> => {
  try {
    const response = await fetch('https://6664003c932baf9032a99ba3.mockapi.io/perfumes');
    if (!response.ok) throw new Error('Failed to fetch perfumes');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching perfumes:', error);
    return [];
  }
};
// Function to fetch comments data from API
const fetchComments = async (): Promise<Comment[]> => {
  try {
    const response = await fetch('https://6664003c932baf9032a99ba3.mockapi.io/comments');
    if (!response.ok) throw new Error('Failed to fetch comments');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching comments:', error);
    return [];
  }
};
// Function to get perfumes data with calculated ratings
export const getPerfumesData = async (selectedBrand: string = ''): Promise<Perfume[]> => {
  try {
    console.log('Fetching perfumes data for selected brand:', selectedBrand);
    const perfumesData = await fetchPerfumes();

    if (!perfumesData) {
      console.error('Error fetching perfumes');
      return [];
    }

    const allFeedbacksData = await fetchComments();

    if (!allFeedbacksData) {
      console.error('Error fetching comments');
      return [];
    }

    // Group comments by their ID for quick access
    const feedbacksById = allFeedbacksData.reduce((acc, feedback) => {
      acc[feedback.id] = feedback;
      return acc;
    }, {});

    // Attach feedbacks to perfumes and calculate ratings
    const perfumesWithComments: Perfume[] = perfumesData.map(perfume => {
      const feedbacks = perfume.feedbacks.map(feedbackId => feedbacksById[feedbackId]).filter(Boolean);
      const totalRating = feedbacks.reduce((sum, feedback) => sum + feedback.rating, 0);
      const rating = feedbacks.length ? totalRating / feedbacks.length : 0;

      return {
        ...perfume,
        feedbacks,
        rating
      };
    });

    // Sort perfumes by rating
    const sortedPerfumes = perfumesWithComments.sort((a, b) => b.rating - a.rating);

    // Filter perfumes based on selected brand
    const filteredPerfumes = selectedBrand ? sortedPerfumes.filter(perfume => perfume.brandName === selectedBrand) : sortedPerfumes;

    console.log('Filtered Perfumes:', filteredPerfumes);
    return filteredPerfumes;
  } catch (error) {
    console.error('Error getting perfumes data:', error);
    return [];
  }
};



// Function to get unique brands from perfumes data
export const getBrands = async (): Promise<{ brandName: string }[]> => {
  try {
    const perfumesData = await fetchPerfumes();
    const brandData = perfumesData
      .map((perfume: Perfume) => ({ brandName: perfume.brandName }))
      .filter((obj, index, self) => self.findIndex((perfume) => perfume.brandName === obj.brandName) === index);
    return [{ brandName: 'All' }, ...brandData];
  } catch (error) {
    console.error('Error getting brands:', error);
    return [];
  }
};
// Function to get perfume details by ID, including comments
export const getPerfumeDetail = async (perfumeId: string): Promise<Perfume | undefined> => {
  try {
    const perfumes = await getPerfumesData();
    const perfume = perfumes.find((perfume: Perfume) => perfume.id === perfumeId);

    if (perfume?.feedbacks.length) {
      perfume.feedbacks = perfume.feedbacks.sort((a, b) => b.rating - a.rating);
    }

    return perfume;
  } catch (error) {
    console.error('Error getting perfume detail:', error);
    return undefined;
  }
};
