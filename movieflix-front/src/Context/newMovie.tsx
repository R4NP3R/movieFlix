import { createContext, useEffect, useState, type ChangeEvent } from "react";
import { getCategories, getStreaming } from "../api";
import type { Category, Streaming } from "../movieflix";
import type { MoviePreviewInterface } from "../pages/movieRegisterPage";

type newMovieContextType = {
  categories: Category[];
  streamings: Streaming[];
  newMoviePreview: MoviePreviewInterface;
  setNewMoviePreview: (value: MoviePreviewInterface) => void;
  addCategory: (e: ChangeEvent<HTMLSelectElement>) => void;
  addStreaming: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectedMovieCategories: Category[];
  selectedMovieStreamings: Streaming[];
  removeSelectedCategory: (index: number) => void;
  removeSelectedStreaming: (index: number) => void;
};
type Props = { children: React.ReactNode };

export const newMovieContext = createContext<newMovieContextType>(
  {} as newMovieContextType
);

export const NewMovieProvider = ({ children }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [streamings, setStreamings] = useState<Streaming[]>([]);
  const [selectedMovieCategories, setSelectedMovieCategories] = useState<
    Category[]
  >([]);
  const [selectedMovieStreamings, setSelectedMovieStreamings] = useState<
    Streaming[]
  >([]);
  const [newMoviePreview, setNewMoviePreview] = useState<MoviePreviewInterface>(
    {
      title: "new movie",
      imageUrl: "https://placehold.co/240x360",
      description: "a New movie About Something",
      rating: 0.0,
      releaseDate: "2024-02-10",
    }
  );

  function removeSelectedCategory(index: number) {
    setCategories([
      ...(categories || []),
      {
        id: selectedMovieCategories[index].id,
        name: selectedMovieCategories[index].name,
      },
    ]);
    selectedMovieCategories.splice(index, 1);
  }

  function removeSelectedStreaming(index: number) {
    setStreamings([
      ...(streamings || []),
      {
        id: selectedMovieStreamings[index].id,
        name: selectedMovieStreamings[index].name,
        imageUrl: selectedMovieStreamings[index].imageUrl,
      },
    ]);

    selectedMovieStreamings.splice(index, 1);
  }
  useEffect(() => {
    if (newMoviePreview.imageUrl === "") {
      setNewMoviePreview({
        ...newMoviePreview,
        imageUrl: "https://placehold.co/240x360",
      });
    }
  }, [newMoviePreview.imageUrl]);

  useEffect(() => {
    const initCategories = async () => {
      try {
        const result = await getCategories();
        setCategories(result.data);
      } catch (err) {
        return "Falha ao buscar Categories";
      }
    };

    const initStreaming = async () => {
      try {
        const result = await getStreaming();
        setStreamings(result.data);
      } catch (err) {
        return "Falha ao buscar Categories";
      }
    };
    initCategories();
    initStreaming();
  }, []);

  function addCategory(event: ChangeEvent<HTMLSelectElement>) {
    const index = Number(event.target.value);
    if (categories) {
      setSelectedMovieCategories([
        ...(selectedMovieCategories || []),
        { id: categories[index].id, name: categories[index].name },
      ]);
      categories.splice(index, 1);
    }
  }

  function addStreaming(event: ChangeEvent<HTMLSelectElement>) {
    const index = Number(event.target.value);
    if (streamings) {
      setSelectedMovieStreamings([
        ...(selectedMovieStreamings || []),
        {
          id: streamings[index].id,
          name: streamings[index].name,
          imageUrl: streamings[index].imageUrl,
        },
      ]);
      streamings.splice(index, 1);
    }
  }
  return (
    <newMovieContext.Provider
      value={{
        categories,
        streamings,
        addCategory,
        addStreaming,
        removeSelectedCategory,
        removeSelectedStreaming,
        setNewMoviePreview,
        newMoviePreview,
        selectedMovieCategories,
        selectedMovieStreamings,
      }}
    >
      {children}
    </newMovieContext.Provider>
  );
};
