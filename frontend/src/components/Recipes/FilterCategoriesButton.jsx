/* eslint-disable react/prop-types */
export default function FilterCategoriesButton({
  id,
  name,
  onClick,
  filterSelected,
}) {
  return (
    <button
      key={id}
      aria-label={name}
      type="button"
      name={name}
      onClick={onClick}
      className={
        filterSelected === name // vérifie si filterSelected correspond à l'id du filtre
          ? "bg-cream border-2 border-red-default active:bg-red-lighter text-red-default font-semibold rounded-[11px] h-full px-4" // Si oui, on lui applique la classe border rouge et fond cream
          : "bg-red-default border-2 border-red-default hover:bg-blue-default hover:border-blue-default active:bg-red-lighter text-cream rounded-[11px] h-full px-4" // Si non, classe normale fond rouge
      }
    >
      {name}
    </button>
  );
}
