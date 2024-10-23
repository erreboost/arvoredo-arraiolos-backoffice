import { toast } from "react-toastify";

const BASE_URL = process.env.BASE_URL

export const editOccurrence = async (
  occurrence: any,
  status: any,
  occurrenceId: string,
  setAllOccurrences: any,
) => {
  const token = localStorage.getItem("token");

  const response = await fetch(
    `${BASE_URL}/api/occurrences/edit/${occurrenceId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: occurrence.name,
        email: occurrence.email,
        comments: occurrence.comments,
        imgUrl: occurrence.imgUrl,
        status: status,
      }),
    },
  );

  const responseData = await response.json();
  if (responseData.message === "Occurence successfully edited") {
    toast.success("Ocorrência editada com sucesso");
  }
  getAllOccurrences(setAllOccurrences);

  console.log("Editar ocurrence", responseData);
};

export const createOccurrence = async (occurrence: any) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/occurrences/create-new`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: occurrence.name,
      email: occurrence.email,
      comments: occurrence.comments,
      imgUrl: occurrence.imgUrl,
      status: occurrence.status,
    }),
  });

  const responseData = await response.json();
  // if(responseData){
  //   toast.success('Arvore deletada com sucesso')
  // }

  console.log("Occurrence created", responseData);
};

export const getAllOccurrences = async (setAllOccurrences: any) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/occurrences/get-all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = await response.json();
  setAllOccurrences(responseData.occurences);
  // if(responseData){
  //   toast.success('Arvore deletada com sucesso')
  // }

  console.log("Occurrences fetched", responseData);
};
