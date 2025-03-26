package Group;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

import com.faraday.project.entidades.Cita;

public class GrouperData {
	
	public ArrayList<HashMap<String,Object>> groupBy(List<Cita>todasCitas){
		
		List<String> separatedDates=separateDates(todasCitas);
		ArrayList<HashMap<String,Object>> datesGrouped=new ArrayList<HashMap<String,Object>>();
		
		for(String d:separatedDates) {
			HashMap<String,Object> data=new HashMap<String,Object>();
			data.put("fecha", d);
			ArrayList<Cita>match=new ArrayList<Cita>();
			for(Cita c:todasCitas) {
				if(c.getInicioCita().format(DateTimeFormatter.ofPattern("yyyy-MM-dd")).equals(d)) match.add(c);
			}
			data.put("valores", match);
			datesGrouped.add(data);
		}
		return datesGrouped;
	} 
	
	
	private boolean existsDateTime(LocalDateTime date, ArrayList<String> dates){
		for(int p=0;p<dates.size();p++) {
			if(dates.get(p).equals(date.format(DateTimeFormatter.ofPattern("yyyy-MM-dd")))) return true;
		}
		return false; 
	}
	
	
	private ArrayList<String> separateDates(List<Cita> todasCitas){
		ArrayList<String>dates=new ArrayList<String>();
		for(Cita c:todasCitas) {
			if(!existsDateTime(c.getInicioCita(), dates)) dates.add(c.getInicioCita().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"))); 
		}
		return dates; 
	}
	
}