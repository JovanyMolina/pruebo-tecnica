"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Loading from "../../componets/loading";

export default function page({ params }) {
  const slug = useParams().slug;

  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log(slug);
    if (!slug) return;
    async function fetchPokemons() {
      try {
        const respuesta = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${slug}`
        );
        const data = await respuesta.json();
        setPokemonData(data);
        setLoading(false);
      } catch (e) {
        console.log("Error en el fetch", e);
      }
    }
    if (slug) fetchPokemons();
  }, [slug]);

  if (loading) return <Loading />;

  return (
    <div className="max-w-lg ">
      <h1 className="text-4xl font-bold text-black">Detalles del pokemon</h1>
      <div className="bg-blue-600  rounded-2xl shadow-xl overflow-x-hidden border border-slate-200">
        <div className="from-blue-600 to-indigo-600 px-8 py-6">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white backdrop:blur-sm rounded-full flex items-center border-4 border-white/30">
              <img
                src={pokemonData?.sprites?.front_default}
                alt="pokemon"
              ></img>
            </div>

            <h2 className="text-3xl font-bold  py-4 text-white">
              ID:  {pokemonData?.id} | Pokemon:  {pokemonData?.name}
            </h2>
          </div>
        </div>
      </div>

      <div className="p-8 bg-gray-300 text-black rounded-2xl shadow-xl mt-6 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 text-2xl">
          <a>Peso: {pokemonData?.weight}</a>
          <a>altura: {pokemonData?.height}</a>
          <a>Tipo: {pokemonData?.types.map((t) => t.type?.name).join(",")}</a>
        </div>
      </div>
    </div>
  );
}
