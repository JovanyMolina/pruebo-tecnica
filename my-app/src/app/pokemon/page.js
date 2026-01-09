"use client";
import React, { useEffect, useState } from "react";
import Loading from "../componets/loading";
 import { useRouter } from "next/navigation"; 
import Link from "next/link";

export default function page() {
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    async function fetchPokemons() {
      try {
        const respuesta = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
        );
        const data = await respuesta.json();
        setPokemonData(data.results);
        setLoading(false);
      } catch (e) {
        console.log("Error en el fetch", e);
      }
    }
    fetchPokemons();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-black">Lista de pokemones</h1>
      <div className="relative mb-6">
        <table className="w-full">
          <thead >
            <tr className="bg-white rounded-xl shadow-lg overflow-hidden border-gray-400">
              <td className="px-6 py-4 text-left text-xs font-semibold text-black uppercase tracking-wider">ID</td>
              <td className="px-6 py-4 text-left text-xs font-semibold text-black uppercase tracking-wider">Nombre del pokemon</td>
              <td className="px-6 py-4 text-left text-xs font-semibold text-black uppercase tracking-wider" >Detalles del pokemon</td>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-400">
            {pokemonData.map((pokemon, index) => (
              <tr key={pokemon.name} className="hover-bg-slate-50 transition-colors duration-150 bg-gray-100 rounded-xl shadow-lg overflow-hidden border-gray-400">
                <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                <td className="px-6 py-4 whitespace-nowrap">{pokemon.name}</td>
                <td className="px-6 py-4 whitespace-nowrap"><button onClick={() => router.push(`/pokemon/${pokemon.name}`)} className="inline-flex items-center bg-blue-600 hover:bg-blue-800 text-white text-sm font-medium rounded-lg gap-2 px-4 py-2 ">Ver detalles</button></td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
