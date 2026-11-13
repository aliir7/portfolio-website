import Shape from "./shape";

/**
 * Hero-style side decoration for slider sections. It sits at the inline-start edge, so it is on the right
 * in Persian (RTL) and on the left in English (LTR), and the shape image leans inwards either way.
 * Place it inside the `relative` block whose height it should follow (not the whole section).
 */
export default function SideDeco() {
  return (
    <div className="hidden md:block" aria-hidden="true">
      <Shape
        width={226}
        height={226}
        containerClassName="-start-18"
        className="absolute -end-11.5 -bottom-51.5"
      />
    </div>
  );
}
