import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { fetchDashboard, saveDashboardSection } from "@/lib/store/features/dynamicDashboard";

export function SaveDashboardSection({ gridstackInstance, brandId }) {
  const dispatch = useDispatch();

  const { activeSection, cardCustomizableProps } = useSelector((state) => state.dynamicDashboard);

  const saveDashboard = async () => {
    const gridstackPropertiesMap = gridstackInstance.save().reduce((prev, cur) => {
      prev[cur.id] = cur;
      return prev;
    }, {});

    const activeSectionCopy = structuredClone(activeSection.section);
    activeSectionCopy.cards.forEach((card) => {
      card.active = cardCustomizableProps?.[card.id]?.active ?? card.active;
      card.columnOrder = cardCustomizableProps?.[card.id]?.columnOrder ?? card.columnOrder;
      if (gridstackPropertiesMap[card.id]) {
        card.gridStackProperties = gridstackPropertiesMap[card.id];
      }
    });

    dispatch(saveDashboardSection(activeSectionCopy))
      .unwrap()
      .then(() => {
        dispatch(fetchDashboard(brandId));
      });
  };

  return <Button onClick={saveDashboard}>Save</Button>;
}
