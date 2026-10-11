"use client";

import { useRef, useState } from "react";

export type Row<T> = T & { uid: string };

/**
 * State for editors of small ordered lists (services, resume, social links, skills).
 * Rows get client-only `uid` keys so inputs keep focus while typing; `values` strips them
 * again, and array order is what the server stores as `sortOrder`.
 * Initial uids are index-based (pure) so server and client render the same ids.
 */
export function useListEditor<T extends object>(initial: T[]) {
  const nextUid = useRef(initial.length);
  const [rows, setRows] = useState<Row<T>[]>(() =>
    initial.map((item, index) => ({ ...item, uid: `row-${index}` })),
  );

  return {
    rows,
    values: rows.map(({ uid: _uid, ...item }) => item as unknown as T),
    add: (item: T) => {
      const uid = `row-${nextUid.current++}`;
      setRows((current) => [...current, { ...item, uid }]);
    },
    update: (uid: string, patch: Partial<T>) =>
      setRows((current) => current.map((row) => (row.uid === uid ? { ...row, ...patch } : row))),
    remove: (uid: string) => setRows((current) => current.filter((row) => row.uid !== uid)),
    move: (uid: string, offset: -1 | 1) =>
      setRows((current) => {
        const from = current.findIndex((row) => row.uid === uid);
        const to = from + offset;
        if (from < 0 || to < 0 || to >= current.length) return current;
        const next = [...current];
        [next[from], next[to]] = [next[to], next[from]];
        return next;
      }),
  };
}
