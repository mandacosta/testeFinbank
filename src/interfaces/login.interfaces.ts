interface ILoginInterfaceEmail {
  email: string;
  password: string;
}

interface ILoginInterfaceCPF {
  cpf: string;
  password: string;
}

type ILoginRequest = ILoginInterfaceEmail & ILoginInterfaceCPF;

export default ILoginRequest;
