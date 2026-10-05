// contentMigration.js
export function initContentMigration() {
  const nodes = Array.from(
    document.querySelectorAll('[data-function="content_migration"]')
  ).filter(el => el.dataset.migrationInit !== '1');

  if (!nodes.length) return;

  nodes.forEach(node => {
    node.dataset.migrationInit = '1';

    const targetId = node.dataset.to;
    const maxWidth = parseInt(node.dataset.maxWidth, 10) || 0;

    const target = targetId && document.getElementById(targetId);
    if (!target) {
      console.warn(`[content_migration] Не найден target #${targetId}`);
      return;
    }

    // Якорь — комментарий прямо перед блоком, чтобы вернуть точно на место
    const anchor = document.createComment('content_migration:anchor');
    node.parentNode.insertBefore(anchor, node);

    const mql = window.matchMedia(`(max-width: ${maxWidth}px)`);

    const apply = (matches) => {
      if (matches) {
        // ширина ≤ max-width — блок уезжает в target
        if (node.parentNode !== target) {
          target.appendChild(node);
        }
      } else {
        // ширина > max-width — блок возвращается на своё место
        const place = anchor.parentNode;
        if (place && node.parentNode !== place) {
          place.insertBefore(node, anchor.nextSibling);
        }
      }
    };

    apply(mql.matches);
    mql.addEventListener('change', e => apply(e.matches));
  });
}