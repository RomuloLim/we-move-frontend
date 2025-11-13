import { Button } from "@/components/Button";
import { FormattedInput } from "@/components/Inputs/FormattedInput";
import { RadioGroup } from "@/components/Inputs/RadioGroup";
import { FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden md:max-w-md lg:shadow-2xl hover:shadow-3xl transition-shadow duration-300">

                <div className="px-6 pt-6">
                    <h1 className="text-2xl font-semibold">Informações pessoais</h1>
                    <p className="text-gray-600">Antes de utilizar esta aplicação, precisamos de algumas informações básicas.</p>
                </div>

                <form className="p-6">
                    <FormattedInput
                        placeholder="Nome"
                        label="Nome completo"
                        className="mb-3"
                    />

                    <RadioGroup label="Gênero" name="gender" containerClassName="mb-3">
                        <RadioGroup.Item value="1" label="Masculino" />
                        <RadioGroup.Item value="2" label="Feminino" />
                        <RadioGroup.Item value="3" label="Não responder" />
                    </RadioGroup>

                    <div className="lg:flex gap-2">
                        <FormattedInput
                            placeholder="000.000.000-00"
                            label="CPF"
                            className="mb-3"
                            mask="000.000.000-00"
                        />

                        <FormattedInput
                            placeholder="olivia@gmail.com"
                            label="E-mail"
                            className="mb-3"
                        />
                    </div>

                    <div className="lg:flex gap-2">
                        <FormattedInput
                            placeholder="Digite sua senha"
                            label="Senha"
                            className="mb-3"
                            type="password"
                            leftIcon={<FiLock size={16} />}
                        />
                        <FormattedInput
                            placeholder="Digite sua senha"
                            label="Confirme a senha"
                            className="mb-3"
                            type="password"
                            leftIcon={<FiLock size={16} />}
                        />
                    </div>

                    <div className="text-center pt-2">
                        <p className="text-xs text-gray-600 md:text-sm">
                            Já possui acesso? {" "}
                            <Link
                                to="/login"
                                className="text-blue-600 font-semibold hover:text-blue-700 hover:underline transition-all duration-200"
                            >
                                Login
                            </Link>
                        </p>
                    </div>

                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 shadow-md hover:shadow-lg transition-all duration-200"
                            size="lg"
                            variant="primary"
                        >
                            Realizar cadastro
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
