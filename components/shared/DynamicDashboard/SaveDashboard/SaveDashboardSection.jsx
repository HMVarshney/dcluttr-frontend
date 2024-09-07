import { Button } from "@/components/ui/button";
import { useDynamicDashboardContext } from "@/lib/context/DynamicDashboard/DynamicDashboardContext";
import { dynamicDashboardActions } from "@/lib/context/DynamicDashboard/DynamicDashboardActions";

export function SaveDashboardSection({ brandId }) {
  const { state, dispatch } = useDynamicDashboardContext();

  const { gridstackInstance, cardCustomizableProps, activeSection } = state;

  const saveDashboard = async () => {
    const gridstackPropertiesMap = gridstackInstance.save().reduce((prev, cur) => {
      prev[cur.id] = cur;
      return prev;
    }, {});

    const activeSectionCopy = structuredClone(activeSection.section);
    if (activeSection.default) {
      activeSectionCopy.cards.forEach((card) => {
        card.active = cardCustomizableProps?.[card.id]?.active ?? card.active;
        card.columnOrder = cardCustomizableProps?.[card.id]?.columnOrder ?? card.columnOrder;
        if (gridstackPropertiesMap[card.id]) {
          card.gridStackProperties = gridstackPropertiesMap[card.id];
        }
      });
    } else {
      activeSectionCopy.cards = Object.keys(cardCustomizableProps).reduce((prev, cur) => {
        const card = { ...cardCustomizableProps[cur] };
        if (gridstackPropertiesMap[cur]) {
          card.gridStackProperties = gridstackPropertiesMap[card.id];
        }
        prev.push(card);
        return prev;
      }, []);
    }

    dynamicDashboardActions
      .saveDashboardSection(dispatch)(activeSectionCopy)
      .then(() => {
        dynamicDashboardActions.fetchDashboard(dispatch)(brandId);
      });
  };

  return <Button onClick={saveDashboard}>Save</Button>;
}
