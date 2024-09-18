import toast from "react-hot-toast";

const BASE_URL = process.env.BASE_URL;

export const getEditorsUsers = async (setEditors?: any) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/users/by-user-group/editor`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = await response.json();
  setEditors(responseData?.users);
  //console.log('Editors', responseData?.users)
};

export const updateUserType = async (email: string, userType: string) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/auth/update-user-group/${email}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      userGroup: userType,
    }),
  });

  const responseData = await response.json();
  if (responseData) {
    toast.success("Novo(a) editor(a) adicionado(a)");
  }

  //console.log('Editors updated', responseData)
};

export const createTree = async (tree: any, X: any, Y: any) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/tree/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      Data: tree.Data,
      Dicofre: tree.Dicofre,
      Localizacao: tree.Localizacao,
      Especie: tree.Especie,
      Nomecomum: tree.Nomecomum,
      Estado_fit: tree.Estado_fit,
      Esdado_cal: tree.Esdado_cal,
      Ava_Risco: tree.Ava_Risco,
      Propo_Inte: tree.Propo_Inte,
      Obser: tree.Obser,
      GlobalID: tree.GlobalID,
      raz_calssifica: tree.raz_calssifica,
      agen_bioticos: tree.agen_bioticos,
      Orgaos_afetados: tree.Orgaos_afetados,
      Grau_de_desfolha: tree.Grau_de_desfolha,
      Sintomas_sinais_desfolhadores: tree.Sintomas_sinais_desfolhadores,
      Grau_de_descoloracao_da_copa: tree.Grau_de_descoloracao_da_copa,
      Deformacao_dos_tecidos: tree.Deformacao_dos_tecidos,
      Alteracao_da_estrutura: tree.Alteracao_da_estrutura,
      Supressao_parcial_dos_orgaos: tree.Supressao_parcial_dos_orgaos,
      Orificios_perfuracoes: tree.Orificios_perfuracoes,
      galerias: tree.galerias,
      necroses: tree.necroses,
      serrim: tree.serrim,
      exsudacao: tree.exsudacao,
      novelos_fibra: tree.novelos_fibra,
      Forma_caldeira: tree.Forma_caldeira,
      Altura_v2: tree.Altura_v2,
      capv2: tree.capv2,
      DAP_v2: tree.DAP_v2,
      idade_apro_v2: tree.idade_apro_v2,
      Especie_Val: tree.Especie_Val,
      Outro_Nome_Comum: tree.Outro_Nome_Comum,
      Outra_Especie: tree.Outra_Especie,
      Codigo: tree.Codigo,
      Outra_Tip_Int: tree.Outra_Tip_Int,
      grupos: tree.grupos,
      POINT_X: tree.POINT_X,
      POINT_Y: tree.POINT_Y,
      POINT_Z: tree.POINT_Z,
    }),
  });

  const responseData = await response.json();
  if (responseData) {
    toast.success("Arvore criada com sucesso");
  }

  console.log("Arvore criada com sucesso", responseData);
};

export const updateTree = async (tree: any, id: string) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/tree/edit/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      tree: tree,
    }),
  });

  const responseData = await response.json();
  if (responseData) {
    toast.success("Arvore editada com sucesso");
  }

  //console.log('Arvore editada com sucesso', responseData)
};

export const deleteTree = async (id: string) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${BASE_URL}/api/tree/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = await response.json();
  if (responseData) {
    toast.success("Arvore deletada com sucesso");
  }

  //console.log('Arvore editada com sucesso', responseData)
};
