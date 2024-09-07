import { useSelector, useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { fetchDashboard, saveDashboardSection } from "@/lib/store/features/dynamicDashboard";

export function SaveDashboardSection({ brandId }) {
  const dispatch = useDispatch();

  const { activeSection, cardCustomizableProps, gridstackInstance } = useSelector((state) => state.dynamicDashboard);

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

    dispatch(saveDashboardSection(activeSectionCopy))
      .unwrap()
      .then(() => {
        dispatch(fetchDashboard(brandId));
      });
  };

  return <Button onClick={saveDashboard}>Save</Button>;
}
